json.user do
    json.extract! @user, :id, :name, :role, :email, :created_at
end