import {Button, Form, FormGroup} from "react-bootstrap";
import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import CreateInvoice from "../../../../types/CreateInvoice";
import {createInvoice, getInvoice, updateInvoice} from "../../../../services/InvoiceService";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../../../../store/store";
import {setInvoiceBackDestination} from "../../../../store/invoiceBackSlice";
import {contractDetailsLink} from "../../../../services/NavigationService";
import useDestination from "../../../../services/useDestination";

type Props = {
    updateMode: boolean
}

const CreateInvoicePage = ({updateMode}: Props) => {
    useDestination()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const backDestination = useSelector((state: RootStore) => state.invoiceBack.destination)
    const {projectId, contractId, invoiceId} = useParams()
    const {setValue, register, handleSubmit, formState: {errors}} = useForm<CreateInvoice>()

    useEffect(() => {
        if (updateMode) {
            getInvoice(projectId!, contractId!, invoiceId!, navigate)
                .then(res => {
                    if (res) {
                        setValue('name', res.invoiceName)
                        setValue('internalNumber', res.internalNumber)
                        setValue('yearMonth', res.yearMonth)
                        setValue('amountOwed.amount', res.amountOwed.amount)
                        setValue('taxRate', res.taxRate!.toString())
                        if (res.paidDate) setValue('paidDate', res.paidDate)
                        if (res.dueDate) setValue('dueDate', res.dueDate)
                    }
                })
        }
    })

    const onBack = () => {
        if(backDestination) navigate(backDestination)
        else navigate(contractDetailsLink(projectId!, contractId!))
        dispatch(setInvoiceBackDestination(undefined))
    }

    const onCreateInvoice: SubmitHandler<CreateInvoice> = data => updateMode ? updateInvoice(projectId!, contractId!, invoiceId!, data, navigate) : createInvoice(projectId!, contractId!, data, navigate)

    return (
        <>
            <span onClick={onBack}
                  className={"back-btn m-2 d-inline-flex justify-content-center align-items-center fs-5 td-none"}>
                <i className="bi bi-arrow-left mx-2"/>
                Back
            </span>

            <div className={"mt-5 mx-auto mw-350"}>
                <h2>{updateMode ? "Edit Invoice" : "Create Invoice"}</h2>

                <Form onSubmit={handleSubmit(onCreateInvoice)} className={"bg-white px-4 py-3 shadow rounded-3"}>
                    <Form.Group controlId={"nameGroup"}>
                        <Form.Label className={"mb-1"}>Name*</Form.Label>
                        <Form.Control {...register("name", {
                            required: "Please enter a name!"
                        })} type={"text"} autoFocus/>
                        <p className={"text-danger"}>{errors.name?.message}</p>
                    </Form.Group>

                    <Form.Group controlId={"internalNumberGroup"}>
                        <Form.Label className={"mb-1"}>Id*</Form.Label>
                        <Form.Control {...register("internalNumber", {
                            required: "Please enter an id!"
                        })} type={"text"}/>
                        <p className={"text-danger"}>{errors.internalNumber?.message}</p>
                    </Form.Group>

                    <Form.Group controlId={"yearMonthGroup"}>
                        <Form.Label className={"mb-1"}>Year and Month*</Form.Label>
                        <Form.Control {...register("yearMonth", {
                            required: "Please enter a correct value!"
                        })} type={"string"} placeholder={"yyyy-mm"}/>
                        <p className={"text-danger"}>{errors.yearMonth?.message}</p>
                    </Form.Group>

                    <Form.Group controlId={"amountGroup"}>
                        <Form.Label className={"mb-1"}>Amount*</Form.Label>
                        <Form.Control {...register("amountOwed.amount", {
                            required: "Please enter an amount!"
                        })} type={"string"}/>
                        <p className={"text-danger"}>{errors.amountOwed?.amount?.message}</p>
                    </Form.Group>

                    <FormGroup controlId={"taxRateGroup"}>
                        <Form.Label className={"mb-1"}>Tax Rate*</Form.Label>
                        <Form.Control {...register("taxRate", {
                            required: "Please enter a tax rate!"
                        })} type={"text"}/>
                        <p className={"text-danger"}>{errors.taxRate?.message}</p>
                    </FormGroup>

                    <FormGroup controlId={"paidDateGroup"} className={"mb-3"}>
                        <Form.Label className={"mb-1"}>Paid date</Form.Label>
                        <Form.Control {...register("paidDate")} type={"date"}/>
                    </FormGroup>

                    <FormGroup controlId={"dueDateGroup"}>
                        <Form.Label className={"mb-1"}>Due date</Form.Label>
                        <Form.Control {...register("dueDate")} type={"date"}/>
                    </FormGroup>

                    <div className={"d-grid mt-4 mb-2"}>
                        <Button type="submit" className={"text-white"}>Save</Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default CreateInvoicePage
