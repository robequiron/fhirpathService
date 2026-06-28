import * as fhirpath from 'fhirpath';

export class FhirpatSer {
  public static evaluate(resource: any, evaluate: any, context:any) {
    const options: fhirpath.OptionVariants = {
      userInvocationTable: {
        age: {
          fn: function (f: any) {
            // Solo 1 parámetro
            const birthDate = new Date(f);
            const today = new Date();
            let edad = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              edad--;
            }
            return edad;
          },
          arity: {0: ["String"]}
        },
        diffDate: {
          fn: function (f: any, f2:any) {
            // Dos parámetros
            const birthDate = new Date(f);
            const today = new Date(f2);
            let edad = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              edad--;
            }
            return edad;
          },
          arity: {0: ["String"], 1: ["Any"]}
        },
         diffValue: {
          fn: function (f: any, caValue:number) {
            //birthDate.diffValue(%ca)
            const birthDate = new Date(f);
            const today = new Date();
            let edad = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              edad--;
            }
            return edad;
          },
          arity: {0: ["String"], 1: ["Number"]}
        },
        getExternal: {
          fn: function (_id: any, resourceType: string) {
            const map: Map<string, any> = context?.resourceExternal;
            if (!map) return null;
            for (const [key, value] of map.entries()) {
              if (key.toLowerCase() === resourceType.toLowerCase()) {
                const expr = "descendants().where(reference.contains('" + _id + "'))"
                return fhirpath.evaluate(value, expr);
              }
            }
            return null;
          },
          arity: {0: ["Any"], 1: ["String"]}
        }
      }
      
    };
    //Busca en cualquier parte del recurso un valor
    //descendants().where($this = 'Patient/67890')
    //Busca en cualquier parte en campos
    //descendants().where(reference = 'Patient/67890')
    //descendants().where(reference.contains('Patient/67890'))
    //descendants().where($this.toString().contains('Patient/67890'))

    //id.getExternal('condition')
    


    return fhirpath.evaluate(resource, evaluate, context, undefined, options);
  }
}
