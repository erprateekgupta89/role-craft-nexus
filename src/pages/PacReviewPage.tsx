
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  FileText,
  Users,
  Key,
  Package,
  ShieldCheck,
  ClipboardCheck,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

// PAC Status types
type PacStatus = 'draft' | 'pending_pom' | 'pending_avp' | 'pending_mr' | 'approved' | 'rejected' | 'changes_requested';

// PAC data interface
interface PacData {
  id: string;
  status: PacStatus;
  generalInfo: any;
  teamDetails: any;
  accessMatrix: any;
  softwareUtilities: any;
  securityChecklist: any;
  customChecklist: any;
  comments: Comment[];
  history: HistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  text: string;
  createdAt: string;
}

interface HistoryEntry {
  id: string;
  status: PacStatus;
  userId: string;
  userName: string;
  userRole: string;
  comment: string;
  createdAt: string;
}

const PacReviewPage = () => {
  const { pacId } = useParams<{ pacId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [pac, setPac] = useState<PacData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch PAC data
  useEffect(() => {
    const fetchPacData = async () => {
      try {
        const data = await api.get<PacData>(`/pac/${pacId}`);
        setPac(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load PAC data');
        toast({
          title: 'Error',
          description: 'Failed to load PAC data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (pacId) {
      fetchPacData();
    }
  }, [pacId, toast]);

  // Handle PAC approval action
  const handleApprove = async () => {
    try {
      setActionLoading(true);
      await api.patch(`/pac/${pacId}/approve`, { comment });
      toast({
        title: 'PAC Approved',
        description: 'The PAC was successfully approved',
      });
      // Refresh PAC data
      const data = await api.get<PacData>(`/pac/${pacId}`);
      setPac(data);
      setComment('');
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to approve PAC',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Handle PAC rejection action
  const handleReject = async () => {
    try {
      setActionLoading(true);
      await api.patch(`/pac/${pacId}/reject`, { comment });
      toast({
        title: 'PAC Rejected',
        description: 'The PAC was rejected',
      });
      // Refresh PAC data
      const data = await api.get<PacData>(`/pac/${pacId}`);
      setPac(data);
      setComment('');
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to reject PAC',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Handle request changes action
  const handleRequestChanges = async () => {
    try {
      setActionLoading(true);
      await api.patch(`/pac/${pacId}/request-changes`, { comment });
      toast({
        title: 'Changes Requested',
        description: 'Changes have been requested for the PAC',
      });
      // Refresh PAC data
      const data = await api.get<PacData>(`/pac/${pacId}`);
      setPac(data);
      setComment('');
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to request changes',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Helper to get status badge
  const getStatusBadge = (status: PacStatus) => {
    switch (status) {
      case 'draft':
        return <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-md text-xs font-semibold flex items-center"><Clock className="h-3 w-3 mr-1" /> Draft</span>;
      case 'pending_pom':
        return <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-semibold flex items-center"><Clock className="h-3 w-3 mr-1" /> Pending PoM Review</span>;
      case 'pending_avp':
        return <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-semibold flex items-center"><Clock className="h-3 w-3 mr-1" /> Pending AVP/VP Review</span>;
      case 'pending_mr':
        return <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-semibold flex items-center"><Clock className="h-3 w-3 mr-1" /> Pending MR Review</span>;
      case 'approved':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-semibold flex items-center"><CheckCircle className="h-3 w-3 mr-1" /> Approved</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-semibold flex items-center"><XCircle className="h-3 w-3 mr-1" /> Rejected</span>;
      case 'changes_requested':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-semibold flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> Changes Requested</span>;
    }
  };

  // Determine if current user can take action
  const canTakeAction = () => {
    if (!user || !pac) return false;

    switch (pac.status) {
      case 'pending_pom':
        return user.role === 'PoM';
      case 'pending_avp':
        return user.role === 'AVP' || user.role === 'VP';
      case 'pending_mr':
        return user.role === 'MR';
      default:
        return false;
    }
  };

  if (loading) {
    return <div className="container py-8">Loading PAC data...</div>;
  }

  if (error || !pac) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || 'PAC not found'}</p>
            <Button className="mt-4" variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">PAC Review</h1>
          <p className="text-muted-foreground mt-1">
            {pac.generalInfo?.projectName || 'Project'} - {getStatusBadge(pac.status)}
          </p>
        </div>
        <div className="flex gap-2">
          {/* Show actions based on role and status */}
          {canTakeAction() && (
            <>
              <Button 
                variant="outline" 
                onClick={handleRequestChanges} 
                disabled={actionLoading}
                className="flex items-center"
              >
                <AlertCircle className="mr-1 h-4 w-4" /> Request Changes
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleReject} 
                disabled={actionLoading}
                className="flex items-center"
              >
                <XCircle className="mr-1 h-4 w-4" /> Reject
              </Button>
              <Button 
                variant="default" 
                onClick={handleApprove} 
                disabled={actionLoading}
                className="flex items-center"
              >
                <CheckCircle className="mr-1 h-4 w-4" /> Approve
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - PAC details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>PAC Details</CardTitle>
              <CardDescription>
                Review the project details and information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general">
                <TabsList className="grid grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="general" className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" /> General
                  </TabsTrigger>
                  <TabsTrigger value="team" className="flex items-center">
                    <Users className="h-4 w-4 mr-1" /> Team
                  </TabsTrigger>
                  <TabsTrigger value="access" className="flex items-center">
                    <Key className="h-4 w-4 mr-1" /> Access
                  </TabsTrigger>
                  <TabsTrigger value="software" className="flex items-center">
                    <Package className="h-4 w-4 mr-1" /> Software
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-1" /> Security
                  </TabsTrigger>
                  <TabsTrigger value="custom" className="flex items-center">
                    <ClipboardCheck className="h-4 w-4 mr-1" /> Custom
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="mt-4">
                  {pac.generalInfo ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-500">Project Name</h4>
                          <p>{pac.generalInfo.projectName}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-500">Project Type</h4>
                          <p className="capitalize">{pac.generalInfo.projectType}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-500">Description</h4>
                        <p className="whitespace-pre-wrap">{pac.generalInfo.projectDescription}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-500">Start Date</h4>
                          <p>{new Date(pac.generalInfo.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-500">Estimated End Date</h4>
                          <p>{new Date(pac.generalInfo.estimatedEndDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-500">Business Unit</h4>
                          <p className="capitalize">{pac.generalInfo.businessUnit}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-500">Key Stakeholder</h4>
                          <p>{pac.generalInfo.stakeholder}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-4 text-gray-500">
                      No general information available
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="team">
                  {pac.teamDetails ? (
                    <div>Team details will be displayed here</div>
                  ) : (
                    <div className="text-center p-4 text-gray-500">
                      No team details available
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="access">
                  {pac.accessMatrix ? (
                    <div>Access matrix will be displayed here</div>
                  ) : (
                    <div className="text-center p-4 text-gray-500">
                      No access matrix available
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="software">
                  {pac.softwareUtilities ? (
                    <div>Software utilities will be displayed here</div>
                  ) : (
                    <div className="text-center p-4 text-gray-500">
                      No software utilities available
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="security">
                  {pac.securityChecklist ? (
                    <div>Security checklist will be displayed here</div>
                  ) : (
                    <div className="text-center p-4 text-gray-500">
                      No security checklist available
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="custom">
                  {pac.customChecklist ? (
                    <div>Custom checklist will be displayed here</div>
                  ) : (
                    <div className="text-center p-4 text-gray-500">
                      No custom checklist available
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Action area for approvers */}
          {canTakeAction() && (
            <Card>
              <CardHeader>
                <CardTitle>Review Comments</CardTitle>
                <CardDescription>
                  Add your comments and take action on this PAC
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Enter your comments here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="mb-4"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleRequestChanges} 
                    disabled={actionLoading || !comment}
                  >
                    Request Changes
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleReject} 
                    disabled={actionLoading || !comment}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="default" 
                    onClick={handleApprove} 
                    disabled={actionLoading}
                  >
                    Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - History and comments */}
        <div className="space-y-6">
          {/* PAC Status History */}
          <Card>
            <CardHeader>
              <CardTitle>Status History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pac.history && pac.history.length > 0 ? (
                  pac.history.map((entry) => (
                    <div key={entry.id} className="border-l-2 border-gray-200 pl-4 py-1">
                      <div className="flex items-center">
                        <span className="font-semibold">{entry.userName}</span>
                        <span className="text-xs text-gray-500 ml-2">({entry.userRole})</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {getStatusBadge(entry.status)}
                        <span className="text-xs text-gray-500 ml-2">
                          {new Date(entry.createdAt).toLocaleString()}
                        </span>
                      </div>
                      {entry.comment && (
                        <p className="text-sm mt-1">{entry.comment}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No history available</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pac.comments && pac.comments.length > 0 ? (
                  pac.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <span className="font-semibold">{comment.userName}</span>
                          <span className="text-xs text-gray-500 ml-2">({comment.userRole})</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm mt-2">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No comments yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PacReviewPage;
