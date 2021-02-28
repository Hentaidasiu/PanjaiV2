import React, { useEffect, useState } from 'react';
import useForm from "../PostPanjai/useForm";
import * as actions from "../../action/postFDT";
import { connect } from "react-redux";
import {
    withStyles, Typography, IconButton, Button,
    TextField, MenuItem, FormControl, InputLabel,
    Select
} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { PhotoCamera, AssignmentTurnedIn } from "@material-ui/icons"
import ButterToast, { Cinnamon } from "butter-toast";

const defaultImageSrc = '/image.png'


const initialFieldValues = {
    title: '',
    message: '',
    item: '',
    n_item: '',
    category: '',
    promptpay: '',
    imageFile: null,
}

const styles = theme => ({
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    imgpreview: {
        width: "40%"
    }
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(0),
    },
}))(MuiDialogActions);


const PostFDT = ({ classes, ...props }) => {

    console.log('*')
    console.log(props)

    const [{ alt, src }, setImg] = useState({
        src: defaultImageSrc,
        alt: 'Upload an Image'
    });

    useEffect(() => {
        if (props.current != 0) {
            setValues({
                ...props.postFDTList.find(x => x._id == props.current)
            })
            setErrors({})
        }
    }, [props.current])

    const validate = () => {
        let temp = { ...errors }
        temp.title = values.title ? "" : "กรุณาใส่ข้อมูล."
        temp.message = values.message ? "" : "กรุณาใส่ข้อมูล."
        temp.item = values.item ? "" : "กรุณาใส่ข้อมูล."
        temp.n_item = values.n_item ? "" : "กรุณาใส่ข้อมูล."
        // temp.category = values.category ? "" : "กรุณาใส่ข้อมูล."
        temp.promptpay = values.promptpay ? "" : "กรุณาใส่ข้อมูล."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormFDT,
        file,
        setFile,
        category,
        setCategory
    } = useForm(initialFieldValues, props.setCurrent)

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            console.log(file);
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });
        }
        else {
            let pic = defaultImageSrc
            setFile(pic)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Foundation"
                    content="Post successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetFormFDT()
            setImg({
                src: defaultImageSrc,
                alt: 'Upload an Image'
            });
        }
        if (validate()) {
            if (props.current == 0) {
                const formData = new FormData();

                formData.append('image', file); // appending file
                formData.append('title', values.title);
                formData.append('message', values.message);
                formData.append('item', values.item);
                formData.append('n_item', values.n_item);
                formData.append('category', category);
                formData.append('promptpay', values.promptpay);

                props.createPostFDT(formData, onSuccess) //ส่งค่าไปserver
            }
            else
                props.updatePostFDT(props.current, values, onSuccess)
        }

    }

    const handleChange = e => {
        setCategory(e.target.value);
    };

    if (props.current == 0) {
        return (
            <form noValidate autoComplete="off" className={`${classes.root} ${classes.form}`}>

                <Typography gutterBottom>
                    <TextField
                        id="standard-basic"
                        label="หัวข้อ"
                        name="title"
                        value={values.title}
                        onChange={handleInputChange}
                        {...(errors.title && { error: true, helperText: errors.title })}
                    />
                    <TextField
                        id="standard-basic"
                        name="message"
                        label="รายละเอียด"
                        fullWidth
                        multiline
                        rows={2}
                        value={values.message}
                        onChange={handleInputChange}
                        {...(errors.message && { error: true, helperText: errors.message })}
                    />
                    <TextField
                        id="standard-basic"
                        name="item"
                        label="ต้องการรับบริจาค"
                        value={values.item}
                        onChange={handleInputChange}
                        {...(errors.item && { error: true, helperText: errors.item })}
                    />
                    <TextField
                        id="standard-number"
                        name="n_item"
                        label="Number"
                        type="number"
                        label="จำนวน"
                        value={values.n_item}
                        onChange={handleInputChange}
                        {...(errors.n_item && { error: true, helperText: errors.n_item })}
                    />
                    <TextField
                        id="standard-basic"
                        name="promptpay"
                        label="promptpay"
                        value={values.promptpay}
                        onChange={handleInputChange}
                        {...(errors.promptpay && { error: true, helperText: errors.promptpay })}
                    /><br />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">หมวดหมู่</InputLabel>
                        <Select
                            onChange={handleChange}
                        >
                            <MenuItem value={"เด็กและเยาวชน"}>เด็กและเยาวชน</MenuItem>
                            <MenuItem value={"ผู้สูงอายุ"}>ผู้สูงอายุ</MenuItem>
                            <MenuItem value={"สัตว์"}>สัตว์</MenuItem>
                            <MenuItem value={"ผู้พิการและผู้ป่วย"}>ผู้พิการและผู้ป่วย</MenuItem>
                            <MenuItem value={"สิ่งแวดล้อม"}>สิ่งแวดล้อม</MenuItem>
                            <MenuItem value={"อื่นๆ"}>อื่นๆ</MenuItem>
                        </Select>
                    </FormControl><br />
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={showPreview}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <div>
                        <img src={src} alt={alt} className={classes.imgpreview} />
                    </div>
                </Typography>


                <DialogActions>
                    <Button onClick={handleSubmit} color="primary" >
                        Post
                </Button>
                </DialogActions>
            </form>
        );
    } else {
        return (
            <form noValidate autoComplete="off" className={`${classes.root} ${classes.form}`}>

                <Typography gutterBottom>
                    <TextField
                        id="standard-basic"
                        label="หัวข้อ"
                        name="title"
                        value={values.title}
                        onChange={handleInputChange}
                        {...(errors.title && { error: true, helperText: errors.title })}
                    />
                    <TextField
                        id="standard-basic"
                        name="message"
                        label="รายละเอียด"
                        fullWidth
                        multiline
                        rows={2}
                        value={values.message}
                        onChange={handleInputChange}
                        {...(errors.message && { error: true, helperText: errors.message })}
                    />
                    <TextField
                        id="standard-basic"
                        name="item"
                        label="ต้องการรับบริจาค"
                        value={values.item}
                        onChange={handleInputChange}
                        {...(errors.item && { error: true, helperText: errors.item })}
                    />
                    <TextField
                        id="standard-number"
                        name="n_item"
                        label="Number"
                        type="number"
                        label="จำนวน"
                        value={values.n_item}
                        onChange={handleInputChange}
                        {...(errors.n_item && { error: true, helperText: errors.n_item })}
                    />
                    <TextField
                        id="standard-basic"
                        name="promptpay"
                        label="promptpay"
                        value={values.promptpay}
                        onChange={handleInputChange}
                        {...(errors.promptpay && { error: true, helperText: errors.promptpay })}
                    /><br />
                    {/* <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={showPreview}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <div>
                        <img src={src} alt={alt} className={classes.imgpreview} />
                    </div> */}
                </Typography>


                <DialogActions>
                    <Button onClick={handleSubmit} color="primary" >
                        Post
                </Button>
                </DialogActions>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    postFDTList: state.postFDT.list
})

const mapActionToProps = {
    createPostFDT: actions.create,
    updatePostFDT: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostFDT));
