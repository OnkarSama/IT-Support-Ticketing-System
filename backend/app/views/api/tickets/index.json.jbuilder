json.array! @tickets.compact do |ticket|
  next unless ticket

  json.extract! ticket, :id, :title, :description, :category, :priority :status, :created_at, :updated_at

  if ticket.creator
    json.creator do
      json.id    ticket.creator.id
      json.name  ticket.creator.name
      json.email ticket.creator.email
    end
  else
    json.creator nil
  end

  if ticket.assignees
    json.assignees do
      json.array! ticket.assignees do |assignee|
        json.id    assignee.id
        json.name  assignee.name
        json.email assignee.email
      end
    end
  else
    json.assignee nil
  end
end