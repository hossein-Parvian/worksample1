import Link from "next/link";
import { Children } from "react";


function DropDown({href , children , ...rest}){
return(
    <Link href={href}>
        <a {...rest}>{children}</a>
    </Link>
)
}


export default DropDown