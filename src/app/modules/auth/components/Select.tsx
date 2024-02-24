import clsx from "clsx";

const Select = (props: any) => {
    return (
        <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-dark">
                {props.title}
            </label>
            <select
                // placeholder={props.title}
                {...props.getFieldProps(props.name)}
                className={clsx(
                    "form-control bg-transparent",
                    {
                        "is-invalid": props.touched && props.errors,
                    },
                    {
                        "is-valid": props.touched && !props.errors,
                    }
                )}
                type={props.type}
                ref={props.ref}
                name={props.name}
                disabled={props.disabled}
                autoComplete="off"
            >
                {props.options.map((item: {id: number, title: string}) => {
                    return <option value={item.id}>{item.title}</option>
                })}
            </select>
        </div>
    );
};

export default Select;
