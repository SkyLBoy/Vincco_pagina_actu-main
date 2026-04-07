import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class VinccoAPITester:
    def __init__(self, base_url="https://service-tech-pro-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.created_contact_id = None

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, data: Dict[Any, Any] = None, headers: Dict[str, str] = None) -> tuple[bool, Dict[Any, Any]]:
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else self.api_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error Response: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"   Error Text: {response.text}")
                return False, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_health_check(self):
        """Test health check endpoint"""
        return self.run_test("Health Check", "GET", "health", 200)

    def test_create_contact(self):
        """Test creating a new contact"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "company": "Test Company",
            "phone": "+1234567890",
            "message": "This is a test message for Vincco contact form"
        }
        
        success, response = self.run_test(
            "Create Contact",
            "POST",
            "contacts",
            200,
            data=contact_data
        )
        
        if success and response.get('contact_id'):
            self.created_contact_id = response['contact_id']
            print(f"   Created contact ID: {self.created_contact_id}")
        
        return success

    def test_create_contact_validation(self):
        """Test contact creation with invalid data"""
        invalid_data = {
            "name": "",  # Empty name should fail
            "email": "invalid-email",  # Invalid email
            "message": ""  # Empty message should fail
        }
        
        return self.run_test(
            "Create Contact - Invalid Data",
            "POST",
            "contacts",
            422,  # Validation error
            data=invalid_data
        )

    def test_get_all_contacts(self):
        """Test getting all contacts"""
        return self.run_test("Get All Contacts", "GET", "contacts", 200)

    def test_get_specific_contact(self):
        """Test getting a specific contact by ID"""
        if not self.created_contact_id:
            print("⚠️  Skipping - No contact ID available")
            return True
        
        return self.run_test(
            "Get Specific Contact",
            "GET",
            f"contacts/{self.created_contact_id}",
            200
        )

    def test_get_nonexistent_contact(self):
        """Test getting a non-existent contact"""
        fake_id = "non-existent-id-12345"
        return self.run_test(
            "Get Non-existent Contact",
            "GET",
            f"contacts/{fake_id}",
            404
        )

    def test_update_contact_status(self):
        """Test updating contact status"""
        if not self.created_contact_id:
            print("⚠️  Skipping - No contact ID available")
            return True
        
        return self.run_test(
            "Update Contact Status",
            "PATCH",
            f"contacts/{self.created_contact_id}/status?status=contacted",
            200
        )

    def test_update_contact_invalid_status(self):
        """Test updating contact with invalid status"""
        if not self.created_contact_id:
            print("⚠️  Skipping - No contact ID available")
            return True
        
        return self.run_test(
            "Update Contact - Invalid Status",
            "PATCH",
            f"contacts/{self.created_contact_id}/status?status=invalid_status",
            400
        )

    def test_legacy_status_endpoints(self):
        """Test legacy status check endpoints"""
        # Test creating status check
        status_data = {"client_name": "Test Client"}
        success1, _ = self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=status_data
        )
        
        # Test getting status checks
        success2, _ = self.run_test("Get Status Checks", "GET", "status", 200)
        
        return success1 and success2

    def test_delete_contact(self):
        """Test deleting a contact (run last)"""
        if not self.created_contact_id:
            print("⚠️  Skipping - No contact ID available")
            return True
        
        return self.run_test(
            "Delete Contact",
            "DELETE",
            f"contacts/{self.created_contact_id}",
            200
        )

def main():
    print("🚀 Starting Vincco API Tests")
    print("=" * 50)
    
    tester = VinccoAPITester()
    
    # Run all tests in order
    test_results = []
    
    # Basic endpoint tests
    test_results.append(("API Root", tester.test_root_endpoint()))
    test_results.append(("Health Check", tester.test_health_check()))
    
    # Contact CRUD tests
    test_results.append(("Create Contact", tester.test_create_contact()))
    test_results.append(("Create Contact Validation", tester.test_create_contact_validation()))
    test_results.append(("Get All Contacts", tester.test_get_all_contacts()))
    test_results.append(("Get Specific Contact", tester.test_get_specific_contact()))
    test_results.append(("Get Non-existent Contact", tester.test_get_nonexistent_contact()))
    test_results.append(("Update Contact Status", tester.test_update_contact_status()))
    test_results.append(("Update Invalid Status", tester.test_update_contact_invalid_status()))
    
    # Legacy endpoints
    test_results.append(("Legacy Status Endpoints", tester.test_legacy_status_endpoints()))
    
    # Cleanup
    test_results.append(("Delete Contact", tester.test_delete_contact()))
    
    # Print summary
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY")
    print("=" * 50)
    
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\n📈 Overall Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())