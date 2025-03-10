import {Link} from 'react-router-dom'


export const NotFound = () => {
    return (
        

        <div className="flex flex-col items-center justify-center">

            <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src='/images/notfound.jpg' alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">NO ENCONTRADO</p>
                
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">La pagina que estas buscando no existe</p>
                

            </div>
        </div>
    )
}