class Api::TicketsController < ApplicationController
    wrap_parameters include: Ticket.attribute_names
    before_action :require_logged_in, only: [:index, :show, :create, :update, :destroy]

    def index
        if current_user.role == "staff"
            @tickets = Ticket.all
            
        else
            @tickets = [Ticket.find_by(creator_id: current_user.id)]
        end
        render :index
    end
    def show
        @ticket = Ticket.find_by(id: params[:id])
        render :show
    end
    def create
        
        @ticket = Ticket.new(ticket_params);
        @ticket.creator_id = current_user.id

        if @ticket.save
            render :show
        else
            render json: {errors: @ticket.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @ticket = Ticket.find_by(id: params[:id])
        if !@ticket
            return render json: {message: 'Failed to find ticket'}, status: :unauthorized
        end

        if current_user.role != "staff" && @ticket.creator_id != current_user.id
            return render json: {message: 'Unauthorized'}, status: :unauthorized
        end

        if @ticket.update(ticket_params)
        render :show
        else
            render json: {errors: @ticket.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        unless current_user.role == "staff"
            @ticket = current_user.tickets.find_by(id: params[:id])
            if !@ticket
                return render json: {message: 'Unauthorized'}, status: :unauthorized
            end
        else
            @ticket = Ticket.find_by(id: params[:id])
        end

        unless @ticket
            return render json: {message: 'ticket not found'}, status: :not_found
        end
        @ticket.destroy
        render :show
    end

    private
    def ticket_params
        params.require(:ticket).permit(:title, :description)
    end
end