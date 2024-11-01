import { reactServerBinder } from '@/utils/db_binders'
import StatsPage from './StatsPage'
import _ from 'lodash'

export default reactServerBinder(async function Page() {
    const attentions = await this.raw(async () => {
        const attentions = await this.models.Attention.find({
            fechaatencion: {
                $gte: '2024/01/01',
                $lte: '2024/12/31'
            }
        }).populate(['lugaratencion', 'Proyectos', 'derivadoa', 'derivadode', 'formacion', 'motivosatencion', 'tipoaenciones'])
            .populate({
                path: 'user',
                populate: ['sexo','socioono', 'nacionalidad', 'ciudadresidencia', 'howDidKnowUs', 'yearDidKnowus']
            })
        return attentions
    })
    const users = _.uniqBy(attentions.map(a => a.user), '_id')
    console.log('attentions', attentions.length)
    console.log('users', users.length)
    return (
        <StatsPage attentions={attentions} partners={users} />
    )
})
