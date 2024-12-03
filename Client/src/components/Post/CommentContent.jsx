import { Box,Divider,Typography } from "@mui/material"



export default function CommentContent({comentario, dateTransform}){ 

    return (
        <Box>
        <Typography variant="body2" style={{alignItems: 'start'}}>{comentario.user_comment.username + ' - ' + dateTransform(comentario.createdAt)}</Typography>
        <Typography  color="text.secondary">
            {comentario.content}
        </Typography>
        <Divider variant="middle"></Divider>
        </Box>
    )

}