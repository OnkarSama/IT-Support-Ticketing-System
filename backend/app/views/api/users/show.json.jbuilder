json.user do
  json.extract! @user, :id, :email, :name, :role, :created_at, :updated_at
end