import { firestore } from "../appServices/AuthService";
import { UserService } from "./UserService";

const userService = new UserService(firestore);

// Example usage
(async () => {
  // Create a new user

  await userService.create("test-id-123", { name: "test" });

  // Read a user by ID
  const user = await userService.read("1");
  console.log(user);

  // Update a user
  await userService.update("1", { name: "Jane Doe" });

  // List all users
  const users = await userService.list();
  console.log(users);

  // Custom operation: Find user by email
  const foundUser = await userService.findByEmail("john.doe@example.com");
  console.log(foundUser);

  // Delete a user
  await userService.delete("1");
})();
