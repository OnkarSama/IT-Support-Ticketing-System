class Api::UsersController < ApplicationController
    def index
        @users = User.all.where(role: "staff")
        render :index
    end

    def show
        @user = User.find(params[:id])
        render :show
    end

    private
    def user_params
    end
end