json.user do
  json.extract! @user, :id, :email, :name, :role, :created_at, :updated_at
    json.tickets_assgined do
        json.array! @user.tickets_assigned do |ticket|
            json.id ticket.id
            json.title ticket.title
            json.description ticket.description
        end
    end
end