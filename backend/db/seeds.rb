
TicketAssignee.destroy_all
Ticket.destroy_all
User.destroy_all

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

puts "Seeding users..."

users = User.create!([
  { name: "Alice Johnson", email: "alice.johnson@example.com", password: "password", role: "faculty" },
  { name: "Bob Smith", email: "bob.smith@example.com", password: "password", role: "staff" },
  { name: "Carol Nguyen", email: "carol.nguyen@example.com", password: "password", role: "staff" },
  { name: "David Lee", email: "david.lee@example.com", password: "password", role: "student" },
  { name: "Emma Davis", email: "emma.davis@example.com", password: "password", role: "student" }
])

faculty, staff1, staff2, student1, student2 = users

puts "Seeding tickets..."

tickets = Ticket.create!([
  {
    title: "Cannot access email account",
    description: "Outlook fails to authenticate after password reset.",
    category: "email",
    status: "open",
    priority: "high",
    creator: student1
  },
  {
    title: "VPN connection drops intermittently",
    description: "VPN disconnects every 10–15 minutes while working remotely.",
    category: "network",
    status: "open",
    priority: "medium",
    creator: student2
  },
  {
    title: "Laptop running extremely slow",
    description: "System freezes when opening multiple applications.",
    category: "hardware",
    status: "in_progress",
    priority: "medium",
    creator: student1
  }
])

puts "Seeding ticket assignees..."

# Add multiple assignees per ticket
TicketAssignee.create!([
  { ticket: tickets[0], user: staff1 },
  { ticket: tickets[0], user: staff2 },

  { ticket: tickets[1], user: staff2 },
  { ticket: tickets[1], user: faculty },

  { ticket: tickets[2], user: staff1 },
  { ticket: tickets[2], user: staff2 },
  { ticket: tickets[2], user: faculty }
])

puts "Seed complete!"
