import ChatInput from "@/Components/Chat/ChatInput";
import ChatMessages from "@/Components/Chat/ChatMessages";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import ChatUserInfoHeader from "@/Components/Chat/ChatUserInfoHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {useEffect} from "react";

export default function Chat(props) {
    console.log('Chat rerender')
    console.log(props)

    const { auth, errors, lastMessages : recentMessages , receiver, conversationMessages: messages } = props;

    return (
        <AuthenticatedLayout user={auth.user} errors={errors}>
            <div className="">
                <div className="messanger h-screen overflow-y-auto p-4">
                    <div className="flex">
                        <div className="basis-2/6 border-r border-slate-100 bg-white pt-3">
                            <ChatSidebar recentMessages={recentMessages} auth={auth} />
                        </div>

                        <div className="basis-4/6">
                            {receiver?.id ? (
                                <>
                                    <ChatUserInfoHeader receiver={receiver} />
                                    <div className="messanger mt-4">
                                        <div className="px-4">
                                            <ChatMessages
                                                messages={messages}
                                                authId={auth?.user?.id}
                                            />
                                        </div>

                                        <ChatInput receiver={receiver} />
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-center items-center bg-slate-100 h-screen">
                                    <p className="font-bold text-2xl text-gray-500">
                                        Please select a User to start
                                        chatting...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
