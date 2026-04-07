"""Initial migration with users and user_profiles

Revision ID: 001
Revises: 
Create Date: 2024-01-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('email', sa.String(255), nullable=True, unique=True),
        sa.Column('phone', sa.String(20), nullable=True, unique=True),
        sa.Column('avatar_url', sa.String(500), nullable=True),
        sa.Column('password', sa.String(255), nullable=True),
        sa.Column('auth_provider', sa.String(50), default='local', nullable=False),
        sa.Column('provider_id', sa.String(255), nullable=True, unique=True),
        sa.Column('status', sa.String(20), default='active', nullable=False),
        sa.Column('email_verified_at', sa.DateTime(), nullable=True),
        sa.Column('phone_verified_at', sa.DateTime(), nullable=True),
        sa.Column('remember_token', sa.String(500), nullable=True),
        sa.Column('access_token', sa.String(1000), nullable=True),
        sa.Column('refresh_token', sa.String(1000), nullable=True),
        sa.Column('last_login_at', sa.DateTime(), nullable=True),
        sa.Column('last_login_ip', sa.String(45), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.Column('deleted_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # Create user_profiles table
    op.create_table(
        'user_profiles',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('user_id', sa.Integer(), nullable=False, unique=True),
        sa.Column('dob', sa.Date(), nullable=True),
        sa.Column('gender', sa.String(20), nullable=True),
        sa.Column('profile_photo', sa.String(500), nullable=True),
        sa.Column('current_role', sa.String(255), nullable=True),
        sa.Column('experience_years', sa.Float(), default=0.0, nullable=False),
        sa.Column('experience_level', sa.String(50), nullable=True),
        sa.Column('primary_skill', sa.String(255), nullable=True),
        sa.Column('highest_qualification', sa.String(255), nullable=True),
        sa.Column('college_name', sa.String(255), nullable=True),
        sa.Column('graduation_year', sa.Integer(), nullable=True),
        sa.Column('city', sa.String(255), nullable=True),
        sa.Column('state', sa.String(255), nullable=True),
        sa.Column('country', sa.String(255), default='India', nullable=False),
        sa.Column('timezone', sa.String(100), default='Asia/Kolkata', nullable=False),
        sa.Column('job_alerts_enabled', sa.Boolean(), default=True, nullable=False),
        sa.Column('whatsapp_opt_in', sa.Boolean(), default=False, nullable=False),
        sa.Column('telegram_opt_in', sa.Boolean(), default=False, nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    op.drop_table('user_profiles')
    op.drop_table('users')
