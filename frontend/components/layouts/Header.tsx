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
  const [curriculumOpen, setCurriculumOpen] = useState(false);
  const [schoolCalendarOpen, setSchoolCalendarOpen] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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

          <Box sx={{ flexGrow: 1, display: 'flex', gap: '1rem', marginLeft: '3rem' }}>
            {nonNestedMenu.map((navItem) => (
              <Button
                key={navItem.path}
                href={navItem.path}
                component="a"
                sx={{
                  my: 2,
                  color: 'white',
                  textDecoration: navItem.path === firstPathname ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                  '&:hover': { textDecoration: navItem.path === firstPathname ? 'underline' : 'none' },
                }}
              >
                {navItem.name}
              </Button>
            ))}

            <Box
              sx={{ position: 'relative' }}
              onMouseOver={() => setSchoolCalendarOpen(true)}
              onMouseLeave={() => setSchoolCalendarOpen(false)}
            >
              <Button
                sx={{ my: 2, color: 'white', position: 'relative' }}
                endIcon={<KeyboardArrowDownIcon sx={{ transform: schoolCalendarOpen ? 'rotate(180deg)' : '' }} />}
              >
                School Calendar
              </Button>
              <Box
                sx={{
                  minWidth: '110px',
                  display: 'flex',
                  flexDirection: 'column',
                  px: 2,
                  py: 1,
                  position: 'absolute',
                  right: '0',
                  bgcolor: 'primary.light',
                  transform: schoolCalendarOpen ? '' : 'translateY(-100%)',
                  pointerEvents: schoolCalendarOpen ? 'unset' : 'none',
                  opacity: schoolCalendarOpen ? 'unset' : '0',
                  transition: '0.25s',
                }}
              >
                {schoolCalendarMenu.map((menuItem) => (
                  <Button
                    key={menuItem.path}
                    href={menuItem.path}
                    component="a"
                    sx={{
                      my: '0.25rem',
                      color: 'white',
                      textDecoration: menuItem.path === firstPathname ? 'underline' : 'none',
                      textUnderlineOffset: '4px',
                      '&:hover': { textDecoration: menuItem.path === firstPathname ? 'underline' : 'none' },
                    }}
                  >
                    {menuItem.name}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box
              sx={{ position: 'relative' }}
              onMouseOver={() => setCurriculumOpen(true)}
              onMouseLeave={() => setCurriculumOpen(false)}
            >
              <Button
                sx={{ my: 2, color: 'white' }}
                endIcon={<KeyboardArrowDownIcon sx={{ transform: curriculumOpen ? 'rotate(180deg)' : '' }} />}
              >
                Curriculum
              </Button>
              <Box
                sx={{
                  minWidth: '110px',
                  display: 'flex',
                  flexDirection: 'column',
                  px: 2,
                  py: 1,
                  position: 'absolute',
                  right: '0',
                  bgcolor: 'primary.light',
                  transform: curriculumOpen ? '' : 'translateY(-100%)',
                  pointerEvents: curriculumOpen ? 'unset' : 'none',
                  opacity: curriculumOpen ? 'unset' : '0',
                  transition: '0.25s',
                }}
              >
                {curriculumMenu.map((menuItem) => (
                  <Button
                    key={menuItem.path}
                    href={menuItem.path}
                    component="a"
                    sx={{
                      my: '0.25rem',
                      color: 'white',
                      textDecoration: menuItem.path === firstPathname ? 'underline' : 'none',
                      textUnderlineOffset: '4px',
                      '&:hover': { textDecoration: menuItem.path === firstPathname ? 'underline' : 'none' },
                    }}
                  >
                    {menuItem.name}
                  </Button>
                ))}
              </Box>
            </Box>
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
