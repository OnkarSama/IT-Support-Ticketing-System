json.array! @users do |user|
    json.extract! user, :id, :name, :email, :role


    json.tickets_assgined do
        json.array! user.tickets_assigned do |ticket|
            json.id ticket.id
            json.title ticket.title
            json.description ticket.description
        end
    end

end