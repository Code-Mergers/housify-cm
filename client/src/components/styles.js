const styles = theme => ({
    paper: {
        marginTop: '10%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        fontSize: "18px",
        marginBottom: "5px",
        textDecoration: "none"
    },
    link: {
        color: "#000000",
        textDecoration: "none"
    },
    buttonStyle : {
        backgroundColor: "#00C170"
    },
    bhkContainer:{
        borderStyle:'solid',
        borderWidth:'1px',
        borderRadius:'5px',
        borderColor:'#bab8b8',
        padding:'2px 5px',
        marginBottom: '5px',
        display: 'flex',
        justifyContent:'space-between'
    },
    bhkTag:{
        padding:'9px',
        fontSize:'0.9rem'
    },
    uploadImg:{
        padding:'2px 5px',
        marginBottom: '10px',
        marginTop: '7px',
        fontSize: '1rem'
    },
    uploadImgBtn:{
        float:'right'
    },
    formControl:{
        display: 'flex',
        justifyContent:'space-between',
        padding:'2px 5px',
        marginBottom: '20px',
        fontSize: '1rem'
    },
    formSelect:{
        float:'right',
    },
    locationTag:{
        paddingTop:'20px'
    }
});

export default styles;
