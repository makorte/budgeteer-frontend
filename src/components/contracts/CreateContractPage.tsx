import {FIXED_PRICE, TIME_AND_MATERIAL} from "../../types/Contract";
import React, {useEffect} from "react";
import CreateContract from "../../types/CreateContract";
import {Link, useNavigate, useParams} from "react-router-dom";
import {createContract, getContract, updateContract} from "../../services/ContractService";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Form, FormGroup} from "react-bootstrap";
import useDestination from "../../services/useDestination";

type Props = {
    updateMode: boolean
}

const CreateContractPage = ({updateMode}: Props) => {
    const {projectId, contractId} = useParams()
    const {setValue, register, handleSubmit, formState: {errors}} = useForm<CreateContract>()
    const contractTypes = [TIME_AND_MATERIAL, FIXED_PRICE]

    const navigate = useNavigate()

    useDestination()

    useEffect(() => {
        if (updateMode) {
            if (!contractId) {
                navigate(`/${projectId}/contracts`)
            } else {
                getContract(contractId, navigate, projectId!)
                    .then(res => {
                        if (res) {
                            setValue("name", res.name)
                            setValue("internalNumber", res.internalNumber)
                            setValue("startDate", res.startDate)
                            setValue("type", res.type)
                            setValue("budget", res.budget)
                            setValue("taxRate", res.taxRate!.toString())
                        }
                    })
            }
        }
    }, [setValue, navigate, contractId, projectId, updateMode])

    const onCreateContract: SubmitHandler<CreateContract> = data => updateMode ? updateContract(contractId!, data, navigate, projectId!) : createContract(projectId!, data, navigate)

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
                        <label htmlFor={"type"} className={"mb-1"}>Type</label>
                        <select className={"form-control"} {...register("type")} id={"type"}>
                            {contractTypes.map(contractType => <option
                            value={contractType} key={contractType}>{contractType}</option>)}
                        </select>
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
