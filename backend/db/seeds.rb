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

# Clear existing data (FK-safe order)
TicketAssignee.destroy_all
Ticket.destroy_all
User.destroy_all

puts "Seeding users..."

users = User.create!([
  {
    name: "Alice Johnson",
    email: "alice.it@example.com",
    password: "password",
    role: "admin"
  },
  {
    name: "Bob Smith",
    email: "bob.support@example.com",
    password: "password",
    role: "technician"
  },
  {
    name: "Carol Nguyen",
    email: "carol.support@example.com",
    password: "password",
    role: "technician"
  },
  {
    name: "David Lee",
    email: "david.employee@example.com",
    password: "password",
    role: "employee"
  },
  {
    name: "Emma Davis",
    email: "emma.employee@example.com",
    password: "password",
    role: "employee"
  }
])

admin, tech1, tech2, employee1, employee2 = users

puts "Seeding tickets..."

tickets = Ticket.create!([
  {
    title: "Cannot access email account",
    description: "Outlook fails to authenticate after password reset.",
    category: "email",
    status: "open",
    priority: "high",
    creator: employee1,
    assignee: tech1
  },
  {
    title: "VPN connection drops intermittently",
    description: "VPN disconnects every 10–15 minutes while working remotely.",
    category: "network",
    status: "open",
    priority: "medium",
    creator: employee2,
    assignee: tech2
  },
  {
    title: "Laptop running extremely slow",
    description: "System freezes when opening multiple applications.",
    category: "hardware",
    status: "in_progress",
    priority: "medium",
    creator: employee1,
    assignee: tech1
  },
  {
    title: "Software installation request",
    description: "Need Adobe Acrobat installed for document review.",
    category: "software",
    status: "closed",
    priority: "low",
    creator: employee2,
    assignee: tech2
  },
  {
    title: "Security alert: suspicious login",
    description: "Received alert for login attempt from unknown location.",
    category: "security",
    status: "open",
    priority: "high",
    creator: employee1,
    assignee: tech1
  }
])

puts "Seeding ticket assignees..."

TicketAssignee.create!([
  # Primary assignments
  { ticket: tickets[0], user: tech1 },
  { ticket: tickets[1], user: tech2 },
  { ticket: tickets[2], user: tech1 },
  { ticket: tickets[3], user: tech2 },
  { ticket: tickets[4], user: tech1 },

  # Secondary / collaborative assignments
  { ticket: tickets[4], user: tech2 },
  { ticket: tickets[2], user: tech2 }
])

puts "✅ IT ticketing seed complete!"

# ticket2 = Ticket.create!
