'use client';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  {
    name: 'Schedules',
    path: '/schedules',
  },
  {
    name: 'Instructors',
    path: '/instructors',
  },
  {
    name: 'Intakes',
    path: '/intakes',
  },
  {
    name: 'Cohorts',
    path: '/cohorts',
  },
  {
    name: 'Courses',
    path: '/courses',
  },
  {
    name: 'Programs',
    path: '/programs',
  },
  {
    name: 'Breaks',
    path: '/breaks',
  },
];

const settings = [
  {
    name: 'Logout',
    path: '/logout',
  },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/schedules">
            <div className="relative h-12 w-12">
              <Image
                src="/images/logo-transparent.png"
                sizes="100%"
                fill
                alt="college logo"
                className="object-contain"
              />
            </div>
          </Link>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: '1rem', marginLeft: '3rem' }}>
            {navigation.map((navItem) => (
              <Button
                key={navItem.path}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textDecoration: navItem.path === pathname ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                }}
                onClick={() => router.push(navItem.path)}
              >
                {navItem.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Rodrigo" src="/" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.path} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
