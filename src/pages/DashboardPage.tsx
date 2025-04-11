
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Calendar, CheckCircle, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h2>
        <p className="text-muted-foreground">
          Here's a summary of your projects and tasks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              2 in progress, 10 completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              6 high priority, 18 normal
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              4 PM, 2 developers, 2 designers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Planning, Review, Retrospective
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Latest project activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Mobile App Redesign", status: "In Progress", progress: 75 },
              { name: "Website Migration", status: "Planned", progress: 10 },
              { name: "Analytics Dashboard", status: "Completed", progress: 100 },
              { name: "User Authentication System", status: "In Review", progress: 90 },
            ].map((project) => (
              <div key={project.name} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{project.name}</p>
                  <p className="text-xs text-muted-foreground">{project.status}</p>
                </div>
                <div className="w-16 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div 
                    className={`h-full ${
                      project.status === "Completed" ? "bg-green-500" : 
                      project.status === "In Progress" ? "bg-blue-500" : 
                      project.status === "In Review" ? "bg-yellow-500" : 
                      "bg-gray-300"
                    }`} 
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Link to="/projects" className="text-sm text-azure-500 hover:underline">
                View all projects →
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks due in the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { id: 1, title: "Review project proposal", dueDate: "Today", priority: "High" },
                { id: 2, title: "Update documentation", dueDate: "Tomorrow", priority: "Medium" },
                { id: 3, title: "Team standup meeting", dueDate: "Apr 12", priority: "Normal" },
                { id: 4, title: "Budget planning", dueDate: "Apr 14", priority: "High" },
              ].map((task) => (
                <li key={task.id} className="flex items-start gap-2">
                  <div className={`mt-0.5 h-2.5 w-2.5 rounded-full ${
                    task.priority === "High" ? "bg-red-500" : 
                    task.priority === "Medium" ? "bg-yellow-500" : 
                    "bg-blue-500"
                  }`} />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{task.title}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        task.priority === "High" ? "bg-red-100 text-red-800" : 
                        task.priority === "Medium" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Link to="/tasks" className="text-sm text-azure-500 hover:underline">
                View all tasks →
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:row-span-1">
          <CardHeader>
            <CardTitle>Role-Specific Actions</CardTitle>
            <CardDescription>Quick links based on your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {user && user.role === 'PM' && (
                <>
                  <Link to="/projects/new" className="col-span-2">
                    <Button className="w-full" variant="outline">Create New Project</Button>
                  </Link>
                  <Link to="/tasks/assign">
                    <Button className="w-full" variant="outline">Assign Tasks</Button>
                  </Link>
                  <Link to="/reports/create">
                    <Button className="w-full" variant="outline">Generate Report</Button>
                  </Link>
                </>
              )}
              
              {user && user.role === 'PoM' && (
                <>
                  <Link to="/portfolio" className="col-span-2">
                    <Button className="w-full" variant="outline">Portfolio Overview</Button>
                  </Link>
                  <Link to="/resource-allocation">
                    <Button className="w-full" variant="outline">Resource Allocation</Button>
                  </Link>
                  <Link to="/risk-assessment">
                    <Button className="w-full" variant="outline">Risk Assessment</Button>
                  </Link>
                </>
              )}
              
              {user && (user.role === 'AVP' || user.role === 'VP') && (
                <>
                  <Link to="/strategic-planning" className="col-span-2">
                    <Button className="w-full" variant="outline">Strategic Planning</Button>
                  </Link>
                  <Link to="/budget-review">
                    <Button className="w-full" variant="outline">Budget Review</Button>
                  </Link>
                  <Link to="/performance-metrics">
                    <Button className="w-full" variant="outline">Performance Metrics</Button>
                  </Link>
                </>
              )}
              
              {user && user.role === 'MR' && (
                <>
                  <Link to="/mr-dashboard" className="col-span-2">
                    <Button className="w-full" variant="outline">Market Requirements</Button>
                  </Link>
                  <Link to="/customer-insights">
                    <Button className="w-full" variant="outline">Customer Insights</Button>
                  </Link>
                  <Link to="/competitor-analysis">
                    <Button className="w-full" variant="outline">Competitor Analysis</Button>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
