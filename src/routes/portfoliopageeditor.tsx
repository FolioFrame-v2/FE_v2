import { createFileRoute } from '@tanstack/react-router';
import PortfolioPageEditor from '@/page/PortfolioPageEditor';

export const Route = createFileRoute('/portfoliopageeditor')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      templateId: search.templateId as string | undefined,
      portfolioId: search.portfolioId as string | undefined,
    }
  },
  component: PortfolioPageEditor,
});
