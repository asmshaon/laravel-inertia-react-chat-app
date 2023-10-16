<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Repositories\MessageRepository;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    /**
     * Display the registration view.
     */
    public function index(MessageRepository $messageRepository, ?User $receiver): Response
    {
        $conversationMessages = $messageRepository->getConversationMessages(auth()->user(), $receiver);

        $lastMessages = $messageRepository->getLastMessages(auth()->user());

        return Inertia::render('Chat/Chat', compact('conversationMessages', 'lastMessages', 'receiver'));
    }

    public function store(Request $request, MessageRepository $messageRepository, User $receiver)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        if (empty($receiver)) {
            return;
        }

        $message = $messageRepository->sendMessage([
            'sender_id' => auth()->id(),
            'receiver_id' => $receiver->id,
            'message' => $request->get('message'),
        ]);

        event(new MessageSent($message));
    }
}
