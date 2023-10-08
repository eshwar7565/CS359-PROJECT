import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Divider, Box, Stack, Typography, Link, IconButton } from '@mui/material';

import { DotsThreeVertical, DownloadSimple, Image } from 'phosphor-react';



const DocMsg = ({ el }) => {
    const theme = useTheme();

    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>

            <Box p={1.5}
                sx={{
                    backgroundColor: el.incoming ?
                        theme.palette.background.default
                        : theme.palette.primary.main,

                    borderRadius: 1.5,
                    width: "max-content",

                }}>


                <Stack spacing={2}>

                    <Stack p={2} direction={"row"} spacing={3}
                        alignItems={"center"}
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        }}>
                        <Image size={48} />
                        <Typography variant='caption'>Abstract.png</Typography>
                        <IconButton>
                            <DownloadSimple></DownloadSimple>
                        </IconButton>

                    </Stack>
                    <Typography variant='body2'
                        sx={{ color: el.incoming ? theme.palette.text : "#FFF" }}>
                        {el.message}
                    </Typography>
                </Stack>
            </Box>
        </Stack>

    )
}



const LinkMsg = ({ el }) => {
    const theme = useTheme();

    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>

            <Box p={1.5}
                sx={{
                    backgroundColor: el.incoming ?
                        theme.palette.background.default
                        : theme.palette.primary.main,

                    borderRadius: 1.5,
                    width: "max-content",

                }}>
                <Stack spacing={2}>
                    <Stack spacing={3} p={2}
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        }}>
                        <img src={el.preview} alt={el.message}

                            style={{
                                maxHeight: 210,
                                borderRadius: "10px",
                            }} />
                        <Stack spacing={2}>
                            <Typography variant='subtitle2'>
                                Create Next
                            </Typography>
                            <Typography variant='subtitle2' component={Link}
                            >
                                www.yt.com
                            </Typography>
                        </Stack>
                        <Typography variant='body2'
                            color={el.incoming ? theme.palette.primary.main : "#fff"}>

                            {el.message}

                        </Typography>
                    </Stack>

                </Stack>

            </Box>

        </Stack>

    )
}




const ReplyMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>

            <Box p={1.5}
                sx={{
                    backgroundColor: el.incoming ?
                        theme.palette.background.default
                        : theme.palette.primary.main,

                    borderRadius: 1.5,
                    width: "max-content",

                }}>

                <Stack spacing={2} >
                    <Stack
                        p={2}
                        spacing={3}
                        direction="column"
                        alignItems={"center"}
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        }}

                    >
                        <Typography variant='body2'
                            color={
                                theme.palette.text
                            }> {el.message}</Typography>
                    </Stack>
                    <Typography variant='body2'
                        color={el.incoming ?

                            theme.palette.text :
                            "#fff"
                        }> {el.message}</Typography>
                </Stack>
            </Box>
        </Stack>
    )
}





const MediaMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>

            <Box p={1.5}
                sx={{
                    backgroundColor: el.incoming ?
                        theme.palette.background.default
                        : theme.palette.primary.main,

                    borderRadius: 1.5,
                    width: "max-content",

                }}>
                <Stack spacing={1}>
                    <img src={el.img} alt={el.message} style={{
                        maxHeight: 210, borderRadius: " 10px"
                    }} />

                    <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                        {el.message}
                    </Typography>

                </Stack>


            </Box>

        </Stack>

    )
}





const TextMsg = ({ el }) => {
    const theme = useTheme();
    return (

        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>


            <Box p={1.5}
                sx={{
                    backgroundColor: el.incoming ? theme.palette.background.default : theme.palette.primary.main,

                    borderRadius: 1.5,
                    width: "max-content",

                }}>

                <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                    {el.message}
                </Typography>

            </Box>
            <DotsThreeVertical size={20}/>
        </Stack>
    )
}



const Timeline = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Divider width="46%"></Divider>
            <Typography variant='caption' sx={{
                color: theme.palette.text

            }}
            >
                {el.text}

            </Typography>
            <Divider width="46%"></Divider>
        </Stack>
    )
};


export { Timeline, MediaMsg, TextMsg, ReplyMsg, LinkMsg, DocMsg };
