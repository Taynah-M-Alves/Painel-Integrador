import './style.css'

export default function MetricCard({ title, value, icon: Icon, iconColor, iconBgColor }) {
    return (
        <div className="metric-box bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
                <div className={`${iconBgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <div>
                    <p className="text-sm text-gray-600 font-medium">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
            </div>
        </div>
    );
}