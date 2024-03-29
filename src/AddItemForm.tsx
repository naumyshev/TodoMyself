import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyPress={onKeyPressHandler}*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*/>*/}
            <TextField
                size={"small"}
                variant={"outlined"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                // className={error ? 'error' : ''}
                error={!!error}
                label={'Title'}
                helperText={error}
            />
            {/*<button onClick={addItem}>+</button>*/}
            {/*<Button*/}
            {/*    variant={"contained"}*/}
            {/*    color={"primary"}*/}
            {/*    size={"small"} onClick={addItem}*/}
            {/*    style={{maxWidth: '17px', maxHeight: '22px', minWidth: '17px', minHeight: '22px'}}>+*/}
            {/*</Button>*/}
            <IconButton
                color='primary'
                onClick={addItem}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    );
};

