import { Heading } from '@/components/ui/Heading';
import { TagsManager } from '@/components/features/tag/TagManager';
import { CreateTag } from '@/components/features/tag/CreateTag';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export const TagsSearchPage = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader>
        <Heading text="Tags" />
      </CardHeader>
      <CardContent>
        <TagsManager />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <Heading text="Create new" level={3} />
      </CardHeader>
      <CardContent>
        <CreateTag />
      </CardContent>
    </Card>
  </div>
);
