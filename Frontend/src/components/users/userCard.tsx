/* eslint-disable react/react-in-jsx-scope */
import { useUserById } from "../../hooks/users";
import { TagContainer } from "../tags/tagContainer";

export function UserCard({ userId, pageTitle }: { userId: string, pageTitle: string }) {
    const { userById } = useUserById(userId);

    if (!userById) return;

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-4xl text-slate-50 p-4">{pageTitle}</h2>
            <h3 className="text-3xl p-2">{userById.name}</h3>
            <div className="border border-white border-opacity-10 rounded-full w-40 h-40 flex flex-col justify-end items-center overflow-hidden">
                <div className="w-10 h-10 bg-gray-300 rounded-full mb-2"></div>
                <div className="w-16 h-16 bg-gray-300 rounded-t-full"></div>
            </div>
            <div className="p-1 pt-4 w-full">
                <TagContainer tags={userById!.tags['skill']} tagType='skill' />
                <TagContainer tags={userById!.tags['interest']} tagType='interest' />
            </div>
        </div>
    )
}