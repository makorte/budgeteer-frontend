import React, {useEffect} from "react";
import {contractDetailsLink} from "../../../../services/NavigationService";
import {setInvoiceBackDestination} from "../../../../store/invoiceBackSlice";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../../../../store/store";
import {SubmitHandler, useForm} from "react-hook-form";
import CreateBudget from "../../../../types/CreateBudget";
import {createBudget, getBudget, updateBudget} from "../../../../services/BudgetService";
import {Button, Form} from "react-bootstrap";
import useDestination from "../../../../services/useDestination";

type Props = {
    updateMode: boolean
}

const CreateBudgetPage = ({updateMode}: Props) => {
    useDestination()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const backDestination = useSelector((state: RootStore) => state.budgetsBack.destination)
    const {projectId, contractId, budgetId} = useParams()
    const {setValue, register, handleSubmit, formState: {errors}} = useForm<CreateBudget>()

    useEffect(() => {
        if (updateMode) {
            getBudget(projectId!, contractId!, budgetId!, navigate)
                .then(res => {
                    if (res) {
                        setValue('name', res.name)
                        if (res.description) setValue('description', res.description)
                        setValue('importKey', res.importKey)
                        setValue('total.amount', res.total.amount)
                        setValue('limit.amount', res.limit.amount)
                    }
                })
        }
    })

    const onBack = () => {
        if (backDestination) navigate(backDestination)
        else navigate(contractDetailsLink(projectId!, contractId!))
        dispatch(setInvoiceBackDestination(undefined))
    }

    const onCreateBudget: SubmitHandler<CreateBudget> = data => updateMode ? updateBudget(projectId!, contractId!, budgetId!, data, navigate) : createBudget(projectId!, contractId!, data, navigate)

    return (<>
        <span onClick={onBack}
              className={"back-btn m-2 d-inline-flex justify-content-center align-items-center fs-5 td-none"}>
                <i className="bi bi-arrow-left mx-2"/>
                Back
        </span>

        <div className="mt-5 mx-auto mw-350">
            <h2>{updateMode ? "Update Budget" : "Create Budget"}</h2>

            <Form onSubmit={handleSubmit(onCreateBudget)} className={"bg-white px-4 py-3 shadow rounded-3"}>
                <Form.Group controlId={"nameGroup"}>
                    <Form.Label className={"mb-1"}>Name*</Form.Label>
                    <Form.Control {...register("name", {
                        required: "Please enter a name!"
                    })} type={"text"} autoFocus/>
                    <p className={"text-danger"}>{errors.name?.message}</p>
                </Form.Group>
                <Form.Group controlId={"descriptionGroup"} className={"mb-2"}>
                    <Form.Label className={"mb-1"}>Description</Form.Label>
                    <Form.Control as={"textarea"} rows={3} {...register("description")} type={"text"} autoFocus/>
                </Form.Group>
                <Form.Group controlId={"importKeyGroup"}>
                    <Form.Label className={"mb-1"}>Import Key*</Form.Label>
                    <Form.Control {...register("importKey", {
                        required: "Please enter an import key!"
                    })} type={"text"} autoFocus/>
                    <p className={"text-danger"}>{errors.importKey?.message}</p>
                </Form.Group>
                <Form.Group controlId={"totalGroup"}>
                    <Form.Label className={"mb-1"}>Total Amount*</Form.Label>
                    <Form.Control {...register("total.amount", {
                        required: "Please enter a total amount!"
                    })} type={"text"} autoFocus/>
                    <p className={"text-danger"}>{errors.total?.amount?.message}</p>
                </Form.Group>
                <Form.Group controlId={"limitGroup"}>
                    <Form.Label className={"mb-1"}>Amount Limit*</Form.Label>
                    <Form.Control {...register("limit.amount", {
                        required: "Please enter an amount limit!"
                    })} type={"text"} autoFocus/>
                    <p className={"text-danger"}>{errors.limit?.amount?.message}</p>
                </Form.Group>
                <div className={"d-grid mt-4 mb-2"}>
                    <Button type="submit" className={"text-white"}>Save</Button>
                </div>
            </Form>
        </div>
    </>)
}

export default CreateBudgetPage
