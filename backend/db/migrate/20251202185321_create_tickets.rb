class CreateTickets < ActiveRecord::Migration[8.1]
  def change
    create_table :tickets do |t|
      t.string :title null: false
      t.string :description null: false
      t.string :status null: false
      t.string :category
      t.timestamps
    end

    add_index :tickets, [:title, :description, :status, :category]
  end
end
