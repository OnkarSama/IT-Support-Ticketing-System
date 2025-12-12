json.array! @tickets.compact do |ticket|
  next unless ticket

  json.extract! ticket, :id, :title, :description, :status, :created_at, :updated_at

  if ticket.creator
    json.creator do
      json.id    ticket.creator.id
      json.name  ticket.creator.name
      json.email ticket.creator.email
    end
  else
    json.creator nil
  end

  if ticket.assignee
    json.assignee do
      json.id    ticket.assignee.id
      json.name  ticket.assignee.name
      json.email ticket.assignee.email
    end
  else
    json.assignee nil
  end
end