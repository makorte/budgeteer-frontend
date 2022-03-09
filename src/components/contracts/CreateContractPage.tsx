import Contract, {FIXED_PRICE, TIME_AND_MATERIAL} from "../../types/Contract";
import React, {useEffect} from "react";
import CreateContract from "../../types/CreateContract";
import {Link, useNavigate, useParams} from "react-router-dom";
import {AxiosError, AxiosResponse} from "axios";
import {createContract, getContract, updateContract} from "../../services/ContractService";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Form, FormGroup} from "react-bootstrap";
import Select from "react-select";
import SelectOption from "../../types/SelectOption";

type Props = {
    updateMode: boolean
}

const CreateContractPage = ({updateMode}: Props) => {
    const {projectId, contractId} = useParams()
    const {setValue, register, handleSubmit, formState: {errors}} = useForm<CreateContract>()
    const contractTypes = [{value: 0, label: TIME_AND_MATERIAL}, {value: 1, label: FIXED_PRICE}]

    const navigate = useNavigate()

    useEffect(() => {
        if (updateMode) {
            if (!contractId) {
                navigate(`/${projectId}/contracts`)
            } else {
                getContract(parseInt(contractId))
                    .then((res: AxiosResponse<Contract>) => {
                        setValue("budget", res.data.budget)
                        setValue("internalNumber", res.data.internalNumber)
                        setValue("name", res.data.name)
                        setValue("startDate", res.data.startDate)
                        setValue("taxRate", res.data.taxRate!.toString())
                    })
                    .catch((err: AxiosError) => {
                        if (err.response?.status === 401) {
                            navigate("/login")
                        } else if(err.response?.status === 400 || err.response?.status === 500) {
                            navigate(`/${projectId}/contracts`)
                        } else {
                            alert(err.message)
                        }
                    })
            }
        }
    }, [setValue, navigate, contractId, projectId, updateMode])

    const onCreateContract: SubmitHandler<CreateContract> = data => {
        const contract = data;
        contract.budget.currencyCode = "EUR"

        if (updateMode) {
            updateContract(parseInt(contractId!), contract)
                .then(() => navigate(`/${projectId}/contracts/details/${contractId}`))
                .catch((err: AxiosError) => {
                    if (err.response?.status === 401) {
                        navigate("/login")
                    } else {
                        alert(err.message)
                    }
                })
        } else {
            createContract(parseInt(projectId!), contract)
                .then((res: AxiosResponse<Contract>) => navigate(`/${projectId}/contracts/details/${res.data.id}`))
                .catch((err: AxiosError) => {
                    if (err.response?.status === 401) {
                        navigate("/login")
                    } else {
                        console.log(err.response)
                    }
                })
        }
    }

    return (
        <>
            <Link to={`/${projectId}/contracts`}
                  className={"m-2 d-inline-flex justify-content-center align-items-center fs-5 td-none"}>
                <i className="bi bi-arrow-left mx-2"/>
                Back
            </Link>

            <div className={"mt-5 mx-auto mw-350"}>
                <h2>{updateMode ? "Edit Contract" : "Create Contract"}</h2>

                <Form onSubmit={handleSubmit(onCreateContract)} className={"bg-white px-4 py-3 shadow rounded-3"}>
                    <Form.Group controlId={"nameGroup"}>
                        <Form.Label className={"mb-1"}>Name</Form.Label>
                        <Form.Control {...register("name", {
                            required: "Please enter a name!"
                        })} type={"text"} autoFocus/>
                        <p className={"text-danger"}>{errors.name?.message}</p>
                    </Form.Group>

                    <FormGroup controlId={"internalNumberGroup"}>
                        <Form.Label className={"mb-1"}>Id</Form.Label>
                        <Form.Control {...register("internalNumber", {
                            required: "Please enter an id!"
                        })} type={"text"}/>
                        <p className={"text-danger"}>{errors.internalNumber?.message}</p>
                    </FormGroup>

                    <FormGroup controlId={"startDateGroup"}>
                        <Form.Label className={"mb-1"}>Start date</Form.Label>
                        <Form.Control {...register("startDate", {
                            required: "Please select a start date!"
                        })} type={"date"}/>
                        <p className={"text-danger"}>{errors.startDate?.message}</p>
                    </FormGroup>

                    <FormGroup controlId={"typeGroup"}>
                        <Form.Label className={"mb-1"}>Type</Form.Label>
                        <Select {...register("type", {
                            required: "Please select a contract type!"
                        })} options={contractTypes}
                                onChange={(selected?: SelectOption | null) => selected && setValue("type", selected.label)}/>
                        <p className={"text-danger"}>{errors.type?.message}</p>
                    </FormGroup>

                    <FormGroup controlId={"budgetGroup"}>
                        <Form.Label className={"mb-1"}>Budget amount (net)</Form.Label>
                        <Form.Control {...register("budget.amount", {
                            required: "Please enter a budget!"
                        })} type={"text"}/>
                        <p className={"text-danger"}>{errors.budget?.amount?.message}</p>
                    </FormGroup>

                    <FormGroup controlId={"taxRateGroup"}>
                        <Form.Label className={"mb-1"}>Tax Rate</Form.Label>
                        <Form.Control {...register("taxRate", {
                            required: "Please enter a tax rate!"
                        })} type={"text"}/>
                        <p className={"text-danger"}>{errors.taxRate?.message}</p>
                    </FormGroup>

                    <div className={"d-grid mt-4 mb-2"}>
                        <Button type="submit" className={"text-white"}>Save</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default CreateContractPage
