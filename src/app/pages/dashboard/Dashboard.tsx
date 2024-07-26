import { useEffect, useState } from "react";
import { MetadataProps } from "../../../types/metadado";
import { AnimalProps } from "../../../types/animal";
import 'react-material-symbols/rounded';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";
import { baseURL } from '../../../config/config';
import { Button } from "@material-ui/core";
import './dashboard.css';
import { Header } from "../../shared/header/Header";
import { Footer } from "../../shared/footer/Footer";

export const Dashboard = () => {
    const [meta, setMeta] = useState<MetadataProps | null>(null);
    const [rows, setRows] = useState<GridRowsProp>([]);
    const navigate = useNavigate();
 
    const deleteAnimal = (id: any) => {
        axios.delete(`${baseURL}/${id}`).then(() => window.location.reload());
    };

    const changeStatus = (id: any, status: any) => {
        if (status == 'Avaiable') {
            status = 'ADOPTED';
        } else if(status == 'Adopted') {
            status = 'AVAIABLE';
        }
        axios.put(`${baseURL}/${id}/status`, { status }).then(
            () => window.location.reload()
        )
    }

    const columns: GridColDef[] = [
        {
            field: 'image', headerName: 'PHOTO', width: 150,
            renderCell: (params) => <img src={params.value as string || ''}
                alt={params.row.name} style={{ width: '50px', height: '50px' ,borderRadius:"40px"}} />
        },
        { field: 'name', headerName: 'NAME', width: 150 },
        { field: 'age', headerName: 'AGE', width: 150 },
        { field: 'description', headerName: 'DESCRIPTION', width: 150 },
        { field: 'category', headerName: 'CATEGORY', width: 150 },
        { field: 'status', headerName: 'STATUS', width: 150 },
        {
            field: 'change', headerName: 'CHANGE STATUS', width: 150, renderCell: (params) =>
                <Button onClick={() => changeStatus(params.value, params.row.status)}>
                    <MaterialSymbol icon="swap_horiz" size={24} fill grade={-25} color="black" />
                </Button>
        },
        {
            field: 'view', headerName: 'DETAILS', width: 150, renderCell: (params) =>
                <Button><Link to={`/profile/${params.value}`}>
                    <MaterialSymbol icon="visibility" size={24} fill grade={-25} color="black" />
                </Link></Button>
        }, {
            field: 'edit', headerName: 'EDIT', width: 150, renderCell: (params) =>
               <Button><Link to={`/edit/${params.value}`}>
                    <MaterialSymbol icon="edit" size={24} fill grade={-25} color="black" />
                </Link></Button>
        },
        {
            field: 'delete', headerName: 'DELETE', width: 150, renderCell: (params) =>
                <Button onClick={() => deleteAnimal(params.value)}>
                    <MaterialSymbol icon="delete" size={24} fill grade={-25} color="black" />
                </Button>
        }
    ];

    useEffect(() => {
        axios.get(`${baseURL}`)
            .then(response => {
                setMeta(response.data);
                const newRows = response.data.content.map((e: AnimalProps) => ({
                    id: e.id,
                    image: e.imgUrl,
                    name: e.name,
                    age: e.age,
                    description: e.description,
                    category: e.category,
                    status: e.status,
                    change: e.id,
                    view: e.id,
                    edit: e.id,
                    delete: e.id
                }));
                setRows(newRows);
                const  data  = {
                    dataSet: meta?.pageable.offset,
                    rowLength: meta?.numberOfElements,
                    maxColumns: meta?.pageable.pageNumber,
                  };
            
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleNewPetClick = () => {
        navigate("/new-pet");
    };

    return (
        <><Header /><div id="dashboard">
            <div style={{ height: "60vh", width: '100%', paddingTop: "5rem" }}>
                <DataGrid columns={columns} rows={rows} style={{ justifyContent: "center" }} pagination {...meta} />
            </div>
        </div>
        <Footer/>
        </>
    );
};
