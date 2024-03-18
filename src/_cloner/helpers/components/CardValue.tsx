import React, { FC } from "react";
import { Card } from "react-bootstrap";

interface IProps {
    title: string,
    value: any
}

const CardValue:FC<IProps> = ({title, value}) => {
    return (
        <Card >
            <div className="flex flex-row justify-center items-center gap-x-8 px-4 py-8">
                <h3 className="font-bold text-gray-500 text-lg">
                    {title}
                </h3>
                <h3 className="font-bold text-xl">{value}</h3>
            </div>
        </Card>
    );
};

export default CardValue;
