import React, { useRef } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function HookFormDoc() {
    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Submission Received', detail: 'The blog is uploaded' });
    };

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    };

    const header = renderHeader();

    const defaultValues = {
        blog: ''
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        data.blog && show();

        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Toast ref={toast} />
                <Controller
                    name="blog"
                    control={control}
                    rules={{ required: 'Content is required.' }}
                    render={({ field }) => <Editor id={field.name} name="blog" value={field.value} headerTemplate={header} onTextChange={(e) => field.onChange(e.textValue)} style={{ height: '320px' }} />}
                />
                <div className="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                    {getFormErrorMessage('blog')}
                    <Button type="submit" label="Save" />
                </div>
            </form>
        </div>
    )
}