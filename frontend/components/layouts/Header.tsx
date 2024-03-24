'use client';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const nonNestedMenu = [
  {
    name: 'Schedules',
    path: '/schedules',
  },
  {
    name: 'Instructors',
    path: '/instructors',
  },
  {
    name: 'Cohorts',
    path: '/cohorts',
  },
];

const schoolCalendarMenu = [
  {
    name: 'Intakes',
    path: '/intakes',
  },
  {
    name: 'Breaks',
    path: '/breaks',
  },
];

const curriculumMenu = [
  {
    name: 'Programs',
    path: '/programs',
  },
  {
    name: 'Courses',
    path: '/courses',
  },
];

const settings = [
  {
    name: 'Logout',
    path: '/logout',
  },
];

const Header = () => {
  const pathname = usePathname();
  const firstPathname = `/${pathname.split('/')[1]}`;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const NavButton = ({ path, name }: { path: string; name: string }) => {
    return (
      <Button
        key={path}
        href={path}
        component="a"
        sx={{
          color: 'white',
          textDecoration: path === firstPathname ? 'underline' : 'none',
          textUnderlineOffset: '4px',
          '&:hover': { textDecoration: path === firstPathname ? 'underline' : 'none' },
        }}
      >
        {name}
      </Button>
    );
  };

  const DropdownMenu = ({ label, menu }: { label: string; menu: { name: string; path: string }[] }) => {
    const [open, setOpen] = useState(false);
    return (
      <Box sx={{ position: 'relative' }} onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <Button
          sx={{ my: 2, color: 'white' }}
          endIcon={<KeyboardArrowDownIcon sx={{ transform: open ? 'rotate(180deg)' : '', transition: '.25s' }} />}
        >
          {label}
        </Button>
        <Box
          sx={{
            minWidth: '110px',
            display: 'flex',
            flexDirection: 'column',
            px: 0.5,
            py: 1,
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
            position: 'absolute',
            right: '0',
            bgcolor: 'primary.light',
            transform: open ? '' : 'translateY(-100%)',
            pointerEvents: open ? 'unset' : 'none',
            opacity: open ? 'unset' : '0',
            transition: '0.25s',
          }}
        >
          {menu.map(({ path, name }) => (
            <NavButton path={path} name={name} />
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <AppBar position="sticky" sx={{ '& a': { '&:hover': { bgcolor: '#FFFFFF30' } } }}>
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

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '3rem' }}>
            {nonNestedMenu.map(({ path, name }) => (
              <NavButton path={path} name={name} />
            ))}
            <DropdownMenu label="School Calendar" menu={schoolCalendarMenu} />
            <DropdownMenu label="Curriculum" menu={curriculumMenu} />
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
