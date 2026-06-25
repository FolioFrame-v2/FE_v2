import { createFileRoute } from '@tanstack/react-router';
import PortfolioPageEditor from '@/page/PortfolioPageEditor';

export const Route = createFileRoute('/portfoliopageeditor')({
  component: PortfolioPageEditor,
});
