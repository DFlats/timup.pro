/* eslint-disable react/react-in-jsx-scope */

import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
    skillTag: string,
    interestTag: string,
}

export default function CreateUserForm() {
    const {
        register,
        handleSubmit,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row">
                {skillTags}
            </div>
            <input type='text' {...register('skillTag')} />
            <input type='text' {...register('interestTag')} />
        </form>
    );
}