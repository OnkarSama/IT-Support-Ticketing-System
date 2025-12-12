json.array! @users do |user|
    json.extract! user, :id, :name, :email, :role

    json.tickets_assgined do
        json.id user.ticket_assigned.id
        json.title user.ticket_assigned.title
        json.description user.ticket_assigned.description
    end

end