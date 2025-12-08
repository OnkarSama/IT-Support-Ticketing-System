# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_12_08_035837) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "tickets", force: :cascade do |t|
    t.bigint "assignee_id"
    t.string "category"
    t.datetime "created_at", null: false
    t.bigint "creator_id", null: false
    t.string "description", null: false
    t.string "status", null: false
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.index ["assignee_id"], name: "index_tickets_on_assignee_id"
    t.index ["creator_id"], name: "index_tickets_on_creator_id"
    t.index ["title", "description", "status", "category"], name: "index_tickets_on_title_and_description_and_status_and_category"
  end

  create_table "tickets_users", id: false, force: :cascade do |t|
    t.bigint "ticket_id", null: false
    t.bigint "user_id", null: false
    t.index ["ticket_id", "user_id"], name: "index_tickets_users_on_ticket_id_and_user_id"
    t.index ["user_id", "ticket_id"], name: "index_tickets_users_on_user_id_and_ticket_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "name", null: false
    t.string "password_digest", null: false
    t.string "role"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name", "role"], name: "index_users_on_name_and_role"
  end

  add_foreign_key "tickets", "users", column: "assignee_id"
  add_foreign_key "tickets", "users", column: "creator_id"
end
