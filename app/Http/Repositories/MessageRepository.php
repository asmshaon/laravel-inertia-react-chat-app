<?php

namespace App\Http\Repositories;

use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class MessageRepository
{

    public function __construct(public Message $model)
    {
    }

    /**
     * @param User $sender
     * @param User|null $receiver
     * @return Collection
     */
    public function getConversationMessages(User $sender, ?User $receiver): Collection
    {
        if (is_null($receiver)) {
            return new Collection([]);
        }

        return $this->model->whereIn('sender_id', [$sender->id, $receiver->id])
            ->whereIn('receiver_id', [$sender->id, $receiver->id])
            ->get();
    }

    /**
     * @param User $user
     * @return Collection
     */
    public function getLastMessages(User $user): Collection
    {
        DB::statement("SET SQL_MODE=''");

        return $this->model->with(['sender:id,name', 'receiver:id,name'])->where(function ($query) use ($user) {
            $query->where('sender_id', $user->id)
                ->orWhere('receiver_id', $user->id);
        })
            ->groupBy(DB::raw('IF(sender_id < receiver_id, sender_id, receiver_id), IF(sender_id < receiver_id, receiver_id, sender_id)'))
            ->select(['id', 'sender_id', 'receiver_id', 'message'])
            ->get();
    }

    public function sendMessage(array $data): Message
    {
        return $this->model->create($data);
    }
}
