import { FormControl, Input, InputLabel, MenuItem, Select, styled, Box, Button } from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
import { baseURL } from "../../../config/config";
import axios from "axios";
import { EnumProps } from "../../../types/enum";
import { newAnimal as NewAnimalType } from "../../../types/newAnimal";
import { useNavigate } from "react-router-dom";
import './form.css';
import { Header } from "../../shared/header/Header";
import { Footer } from "../../shared/footer/Footer";

const BootstrapInput = styled(Input)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 0.2rem rgba(${theme.palette.primary.main}, 0.25)`,
        },
    },
}));

export const Form = () => {
    const [status, setStatus] = useState<EnumProps[]>([]);
    const [category, setCategory] = useState<EnumProps[]>([]);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imgUrl, setImgUrl] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<{ name?: string; value: unknown; }>) => {
        const { name, value } = event.target;
        if (name === 'category') {
            setSelectedCategory(value as string);
        } else if (name === 'status') {
            setSelectedStatus(value as string);
        }
    };

    useEffect(() => {
        axios.get(`${baseURL}/status`).then(response => {
            setStatus(response.data);
        });

        axios.get(`${baseURL}/category`).then(response => {
            setCategory(response.data);
        });
    }, []);
    const home = () => {
        navigate("/dashboard");
    };
    const save = () => {
        const newAnimal: NewAnimalType = {
            name: name,
            description: description,
            imgUrl: imgUrl,
            dateOfBirth: dateOfBirth,
            category: selectedCategory,
            status: selectedStatus,
        };

        axios.post(`${baseURL}`, newAnimal)
            .then(() => {
                navigate("/dashboard");
            })
            .catch(error => {
                console.error('Error saving animal:', error);
            });
    };

    return (
        <><Header />
            <div id="form">
                <Box component="form">
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="name-input">Name</InputLabel>
                        <Input id="name-input" name="name" onChange={(e) => setName(e.target.value)} aria-describedby="name-helper-text" />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="description-input">Description</InputLabel>
                        <Input id="description-input" name="description" onChange={(e) => setDescription(e.target.value)} aria-describedby="description-helper-text" />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="image-url-input">Image URL</InputLabel>
                        <Input id="image-url-input" name="imgUrl" onChange={(e) => setImgUrl(e.target.value)} aria-describedby="image-url-helper-text" />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            name="category"
                            value={selectedCategory}
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            {category.map((e) => (
                                <MenuItem key={e.id} value={e.id}>
                                    <em>{e.description}</em>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="birth-input">Birth</InputLabel>
                        <Input id="birth-input" name="dateOfBirth" type="date" placeholder="dd-mm-yyyy" onChange={(e) => setDateOfBirth(e.target.value)} aria-describedby="birth-helper-text" />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            name="status"
                            value={selectedStatus}
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            {status.map((e) => (
                                <MenuItem key={e.id} value={e.id}>
                                    <em>{e.description}</em>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button id="save" onClick={save}>SAVE</Button>
                </Box>
            </div>
            <Footer/>
            </>
    );
};
