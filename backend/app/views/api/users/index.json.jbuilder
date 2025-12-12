json.array! @users do |user|
    json.extract! user, :id, :name, :email, :role

    json.tickets_assgined do |ticket|
        json.id ticket.id
        json.title ticket.title
        json.description ticket.description
    end

end