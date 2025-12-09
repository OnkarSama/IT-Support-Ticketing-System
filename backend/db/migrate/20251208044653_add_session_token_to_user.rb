class AddSessionTokenToUser < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :session_token, :string, null: false
    add_index :users, :session_token
  end
end
