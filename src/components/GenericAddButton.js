import { Button } from '@mui/material';
import React from 'react';
import { apiVersion, appKey, baseURL, getToken, mineBoardsEndPoint } from '../constants/Constants';

const GenericAddButton = (props) => {
    let { isList } = props;
    const text = isList ? 'Add another list' : 'New board';

    return (
        <Button
            // onClick={handleClick}
            variant="contained"
            style={isList ? styles.addList : styles.addBoard}
        >
            {text}
        </Button>
    )
}

const styles = {
    addBoard:
    {
        color: "white",
        backgroundColor: "#0079bf",
        width: 204,
        height: 50,
        marginLeft: "40%",
        marginTop: '25%'
    },
    addList: {
        backgroundColor: "rgba(0, 121, 191,1)",
        borderRadius: 3,
        width: 272,
        height: 40,
        padding: 8,
        marginRight: 8
    }
}

export default GenericAddButton;