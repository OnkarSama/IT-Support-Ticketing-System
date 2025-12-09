Ticket.delete_all
User.delete_all


test_user = User.create!(
    name: "Joe B",
    email: "test@gmail.com",
    password: "password",
    role: "staff"
)

alice = User.create!(
  name: "Alice Admin",
  email: "alice@example.com",
  password: "password123",
  role: "staff"
)

bob = User.create!(
  name: "Bob User",
  email: "bob@example.com",
  password: "password123",
  role: "faculty"

)

carol = User.create!(
  name: "Carol Staff",
  email: "carol@example.com",
  password: "password123",
  role: "staff"

)

dave = User.create!(
  name: "Dave User",
  email: "dave@example.com",
  password: "password123",
  role: "faculty"
)


ticket1 = Ticket.create!(
  title: "Cannot login",
  description: "User unable to login with correct credentials",
  status: "open",
  creator_id: bob.id,
  assignee_id: alice.id,
  category: "login"
)

# ticket2 = Ticket.create!
