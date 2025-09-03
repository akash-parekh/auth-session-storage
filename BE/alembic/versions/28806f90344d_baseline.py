"""baseline

Revision ID: 28806f90344d
Revises: bdbe12ec9b3c
Create Date: 2025-09-03 09:42:37.510145

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '28806f90344d'
down_revision: Union[str, Sequence[str], None] = 'bdbe12ec9b3c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
